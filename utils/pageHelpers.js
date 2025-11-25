/**
 * Utility functions for pages
 */

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get unique items from array
 * @param {array} array - Input array
 * @returns {array} Array with unique items
 */
export const getUnique = (array) => {
  return Array.from(new Set(array));
};

/**
 * Filter items by multiple conditions
 * @param {array} items - Items to filter
 * @param {object} conditions - Conditions object { key: value }
 * @returns {array} Filtered items
 */
export const filterByConditions = (items, conditions) => {
  return items.filter(item => {
    return Object.entries(conditions).every(([key, value]) => {
      if (value === 'All' || value === '') return true;
      return item[key] === value;
    });
  });
};

/**
 * Search items by multiple fields
 * @param {array} items - Items to search
 * @param {string} searchTerm - Search term
 * @param {array} fields - Fields to search in
 * @returns {array} Filtered items
 */
export const searchByFields = (items, searchTerm, fields) => {
  if (!searchTerm) return items;
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    fields.some(field => {
      const value = item[field];
      if (Array.isArray(value)) {
        return value.some(v => String(v).toLowerCase().includes(term));
      }
      return String(value).toLowerCase().includes(term);
    })
  );
};
