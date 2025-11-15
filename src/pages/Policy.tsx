import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export type PolicyType = "Rental" | "Membership" | "Privacy";

export default function Policy(props: { policyType: PolicyType }) {
    const { policyType } = props;
    const resolvedTitle = policyType === "Rental"
            ? "Rental Agreement"
            : policyType === "Membership"
                ? "Membership Agreement"
                : "Privacy Policy";
    const [searchParams] = useSearchParams();
    const date_str = searchParams.get('date');
    let date: Date;
    if (date_str && /^\d{4}-\d{2}-\d{2}$/.test(date_str)) {
        const tmp = new Date(date_str);
        const [y, m, d] = date_str.split("-").map(Number);

        // Validate: JS Date will autocorrect invalid values, so we must check manually
        if (
            tmp.getUTCFullYear() === y &&
            tmp.getUTCMonth() + 1 === m &&
            tmp.getUTCDate() === d
        ) {
            date = tmp;
        } else {
            date = new Date();
        }
    } else {
        date = new Date();
    }

    const [policyContent, setPolicyContent] = useState<string>("Loading...");
    const [policyEffectiveDate, setPolicyEffectiveDate] = useState<string>("Loading date...");

    useEffect(() => {
        async function fetchPolicy() {
            try {
                // Use GET with query param (backend expects GET)
                const res = await fetch("https://dev.veygo.rent/api/v1/policy/get", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        policy_type: policyType,
                        effective_date: date.toISOString().slice(0, 10)
                    })
                });
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                const data: {
                    policy_effective_date: string
                    content: string
                } = await res.json();
                if (data && data.content && data.policy_effective_date) {
                    setPolicyContent(data.content);
                    setPolicyEffectiveDate(` Effective on: ${data.policy_effective_date}`);
                } else {
                    setPolicyContent("No policy content found.");
                    setPolicyEffectiveDate("Last updated: Never");
                }
            } catch (err) {
                console.error("Error fetching policy content:", err);
                setPolicyContent("No policy content found.");
                setPolicyEffectiveDate("Last updated: Never");
            }
        }
        fetchPolicy();
    }, [date, policyType]);

    return (
        <div>
            <h1>{ resolvedTitle }</h1>
            <h2>{ policyEffectiveDate }</h2>
            <div className="markdown-body">
                <ReactMarkdown>{policyContent}</ReactMarkdown>
            </div>
        </div>
    );
}