export type PolicyType = "Rental" | "Membership" | "Privacy";

export interface PolicyRequest {
  policyType: PolicyType;
  effectiveDate: string;
}

export interface PolicyResponse {
  policy_effective_date: string;
  content: string;
}

const POLICY_ENDPOINT = "https://dev.veygo.rent/api/v1/policy/get";

export async function fetchPolicy(request: PolicyRequest): Promise<PolicyResponse | null> {
  const response = await fetch(POLICY_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      policy_type: request.policyType,
      effective_date: request.effectiveDate,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as Partial<PolicyResponse>;

  if (!data.content || !data.policy_effective_date) {
    return null;
  }

  return {
    content: data.content,
    policy_effective_date: data.policy_effective_date,
  };
}
