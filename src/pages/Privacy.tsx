import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Privacy() {
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
                    body: JSON.stringify({ policy_type: "Privacy" })
                });
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                const data: { content?: string } = await res.json();
                console.log("Fetched policy:", data);
                if (data && data.content) {
                    setPolicyContent(data.content);
                } else {
                    setPolicyContent("No policy content found.");
                }
            } catch (err) {
                console.error("Error fetching policy:", err);
                setPolicyContent("Failed to fetch policy content.");
            }
        }
        fetchPolicy();
    }, []);

    return (
        <div>
            <h1>Privacy Page</h1>
            <h2>The requested date is { date.toISOString().slice(0, 10) }</h2>
            <div className="markdown-body">
                <ReactMarkdown>{policyContent}</ReactMarkdown>
            </div>
        </div>
    );
}