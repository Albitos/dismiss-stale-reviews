import { isPresent } from './type-guards.js'

export function shouldOwnerBeDismissed(teamMembers: Record<string, string[]>, authorLogin?: string) {
  if (!authorLogin) {
    return false;
  }
  const dismissOnlyFrom = ['@test-org-ws/test-team'];
  if (dismissOnlyFrom.includes(authorLogin)) {
    return true;
  }
  const allDismissibleReviewers = dismissOnlyFrom.flatMap(reviewer => teamMembers[reviewer]).filter(isPresent)
  console.log(`Reviewers who should be dismissed: ${allDismissibleReviewers.join(',')}`)
  return allDismissibleReviewers.includes(`@${authorLogin}`);
}