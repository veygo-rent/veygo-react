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
                    setPolicyContent("No policy content found. Please coontact Veygo for assistance.");
                    setPolicyEffectiveDate("Last updated: Never");
                }
                const data: {
                    policy_effective_date: string
                    content: string
                } = await res.json();
                if (data && data.content && data.policy_effective_date) {
                    setPolicyContent(data.content);
                    setPolicyEffectiveDate(` Effective on: ${data.policy_effective_date}`);
                } else {
                    setPolicyContent("No policy content found. Please coontact Veygo for assistance.");
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

    // ---- styles (design only) ----
    const containerStyle: React.CSSProperties = {
        display: "grid",
        placeItems: "start center",
        padding: "24px",
    };
    const cardStyle: React.CSSProperties = {
        width: "min(920px, 100%)",
        background: "var(--card-bg, #fff)",
        color: "var(--card-fg, #111)",
        borderRadius: 16,
        boxShadow: "0 1px 2px rgba(0,0,0,.05), 0 12px 24px -10px rgba(0,0,0,.15)",
        padding: "28px",
        border: "1px solid rgba(0,0,0,.06)",
    };
    const headerStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 12,
    };
    const titleStyle: React.CSSProperties = {
        fontSize: 28,
        lineHeight: 1.2,
        margin: 0,
        fontWeight: 700,
        letterSpacing: "-0.01em",
    };
    const chipRowStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 12,
    };
    const chipStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(0, 122, 255, .10)",
        color: "rgb(0, 90, 200)",
        border: "1px solid rgba(0, 122, 255, .25)",
    };
    const markdownStyle: React.CSSProperties = {
        lineHeight: 1.7,
        fontSize: 16,
    };
    const mdComponents = {
        h1: (props: any) => <h1 style={{ fontSize: 26, marginTop: 24, marginBottom: 12 }} {...props} />,
        h2: (props: any) => <h2 style={{ fontSize: 22, marginTop: 20, marginBottom: 10 }} {...props} />,
        h3: (props: any) => <h3 style={{ fontSize: 18, marginTop: 18, marginBottom: 8 }} {...props} />,
        p:  (props: any) => <p style={{ margin: "10px 0" }} {...props} />,
        ul: (props: any) => <ul style={{ paddingLeft: 22, margin: "10px 0" }} {...props} />,
        ol: (props: any) => <ol style={{ paddingLeft: 22, margin: "10px 0" }} {...props} />,
        blockquote: (props: any) => (
            <blockquote
                style={{
                    margin: "14px 0",
                    padding: "10px 14px",
                    borderLeft: "4px solid rgba(0,0,0,.15)",
                    background: "rgba(0,0,0,.03)",
                    borderRadius: 8,
                }}
                {...props}
            />
        ),
        code: (props: any) => (
            <code
                style={{
                    background: "rgba(0,0,0,.06)",
                    borderRadius: 6,
                    padding: "2px 6px",
                    fontSize: 14,
                }}
                {...props}
            />
        ),
        pre: (props: any) => (
            <pre
                style={{
                    background: "rgba(0,0,0,.06)",
                    borderRadius: 12,
                    padding: 16,
                    overflow: "auto",
                }}
                {...props}
            />
        ),
        strong: (props: any) => <strong style={{ fontWeight: 700 }} {...props} />,
    };

    return (
        <main style={containerStyle}>
            <article style={cardStyle}>
                <header style={headerStyle}>
                    <h1 style={titleStyle}>{ resolvedTitle }</h1>
                </header>

                <div style={chipRowStyle}>
                    <span style={chipStyle}>
                        {policyEffectiveDate}
                    </span>
                    <span style={{ ...chipStyle, background: "rgba(0,0,0,.06)", color: "#333", borderColor: "rgba(0,0,0,.15)" }}>
                        Type: {props.policyType}
                    </span>
                </div>

                <div className="markdown-body" style={markdownStyle}>
                    <ReactMarkdown components={mdComponents}>{policyContent}</ReactMarkdown>
                </div>
            </article>
        </main>
    );
}