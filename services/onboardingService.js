import { supabase } from './supabaseClient';

/**
 * Save university onboarding data to Supabase
 * Maps form data to 5 linked tables:
 * - institutions (main details)
 * - programs (academic programs)
 * - admissions (entrance requirements)
 * - financials (tuition & scholarships)
 * - contacts (representative & verification)
 */
export async function submitUniversityOnboarding(formData, user, verificationDocFile) {
    try {
        // Step 1: Insert into institutions table (skip `created_by` — column is not present in DB)
        const { data: institutionData, error: institutionError } = await supabase
            .from('institutions')
            .insert([
                {
                    institution_name: formData.institutionName,
                    country: formData.country,
                    city: formData.city,
                    institution_type: formData.institutionType,
                    accreditation: formData.accreditation,
                },
            ])
            .select()
            .single();

        if (institutionError) throw new Error(`Institutions insert failed: ${institutionError.message}`);

        const institutionId = institutionData.id;
        console.log('✓ Institution created:', institutionId);

        // Step 2: Insert programs
        if (formData.programs.length > 0) {
            const programsData = formData.programs.map((prog) => ({
                institution_id: institutionId,
                name: prog.name,
                degree: prog.degree,
                language: prog.language,
                duration: prog.duration ? parseInt(prog.duration, 10) : null,
            }));

            const { error: programsError } = await supabase
                .from('programs')
                .insert(programsData);

            if (programsError) throw new Error(`Programs insert failed: ${programsError.message}`);
            console.log('✓ Programs created:', programsData.length);
        }

        // Step 3: Insert admissions requirements
        const { error: admissionsError } = await supabase
            .from('admissions')
            .insert([
                {
                    institution_id: institutionId,
                    acceptance_rate: formData.acceptanceRate ? parseFloat(formData.acceptanceRate) : null,
                    gmat_required: formData.gmatRequired,
                    gre_required: formData.greRequired,
                    ielts_min: formData.ieltsMinScore || null,
                    toefl_min: formData.toeflMinScore || null,
                    required_documents: formData.requiredDocuments.length > 0 ? formData.requiredDocuments : null,
                },
            ]);

        if (admissionsError) throw new Error(`Admissions insert failed: ${admissionsError.message}`);
        console.log('✓ Admissions requirements created');

        // Step 4: Insert financials
        const { error: financialsError } = await supabase
            .from('financials')
            .insert([
                {
                    institution_id: institutionId,
                    tuition_range: formData.tuitionRange || null,
                    scholarships_available: formData.scholarshipsAvailable,
                    scholarship_amount: formData.scholarshipAmount || null,
                    payment_plans_available: formData.paymentPlans,
                },
            ]);

        if (financialsError) throw new Error(`Financials insert failed: ${financialsError.message}`);
        console.log('✓ Financials created');

        // Step 5: Upload verification document to storage (if provided)
        if (verificationDocFile) {
            let verificationDocUrl = null;
            const fileName = `${institutionId}/${Date.now()}_${verificationDocFile.name}`;
            verificationDocUrl = fileName;
            //   const { error: uploadError } = await supabase.storage
            //     .from('university_documents')
            //     .upload(fileName, verificationDocFile);

            //   if (uploadError) {
            //     console.warn('Document upload warning:', uploadError.message);
            //   } else {
            //     verificationDocUrl = fileName;
            //     console.log('✓ Document uploaded:', fileName);
            //   }
        }

        // Step 6: Insert contacts
        const { error: contactsError } = await supabase
            .from('contacts')
            .insert([
                {
                    institution_id: institutionId,
                    contact_name: formData.contactName,
                    contact_email: formData.contactEmail,
                    contact_phone: formData.contactPhone,
                    website_url: formData.websiteUrl || null,
                    verification_document_url: verificationDocUrl,
                },
            ]);

        if (contactsError) throw new Error(`Contacts insert failed: ${contactsError.message}`);
        console.log('✓ Contact information created');

        return {
            success: true,
            institutionId,
            message: 'University onboarding data successfully submitted to Supabase!',
        };
    } catch (error) {
        console.error('Onboarding submission error:', error);
        throw error;
    }
}
