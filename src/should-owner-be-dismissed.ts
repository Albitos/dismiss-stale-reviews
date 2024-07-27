import { isPresent } from './type-guards.js'
import { getInputs } from './get-inputs.js'

export function shouldOwnerBeDismissed(
  teamMembers: Record<string, string[]>,
  authorLogin?: string,
) {
  if (!authorLogin) {
    return false
  }
  const { dismissOnly } = getInputs()
  console.log({ teamMembers })
  if (dismissOnly.includes(`@${authorLogin}`)) {
    return true
  }
  const allDismissibleReviewers = dismissOnly
    .flatMap(reviewer => teamMembers[reviewer])
    .filter(isPresent)
  console.log(
    `Reviewers who should be dismissed: ${allDismissibleReviewers.join(',')}`,
  )
  return allDismissibleReviewers.includes(`@${authorLogin}`)
}
