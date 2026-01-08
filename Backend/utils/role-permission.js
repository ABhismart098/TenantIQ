module.exports.canApprove = (approver, target) => {

  if (target.role_id === 2) {
    return [3, 4].includes(approver.role_id);
  }

  if (target.role_id === 3) {
    return approver.role_id === 4;
  }

  if (target.role_id === 4) {
    return approver.role_id === 1;
  }

  if (target.role_id === 1) {
    return approver.role_id === 1 && approver.status === "ACTIVE";
  }

  return false;
};
