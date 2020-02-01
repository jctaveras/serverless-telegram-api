/**
 * Retrieve new members
 *
 * @param {Array} newMembers
 * @returns {Array} - Return all users that are not bot
 */
function getUsers(newMembers) {
  return newMembers.filter(({ is_bot }) => !is_bot);
}

export default getUsers;
