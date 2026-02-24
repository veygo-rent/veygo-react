import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "react-router";

import { fetchPolicy, type PolicyType } from "../api/policy";
import styles from "../css/policy.module.css";

interface PolicyProps {
  policyType: PolicyType;
}

const emptyMessage = "No policy content found. Please contact Veygo for assistance.";

function resolveDateParam(input: string | null): string {
  const today = new Date().toISOString().slice(0, 10);

  if (!input || !/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return today;
  }

  const normalized = new Date(`${input}T00:00:00.000Z`);
  if (Number.isNaN(normalized.getTime())) {
    return today;
  }

  const [year, month, day] = input.split("-").map(Number);
  const validDate =
    normalized.getUTCFullYear() === year &&
    normalized.getUTCMonth() + 1 === month &&
    normalized.getUTCDate() === day;

  return validDate ? input : today;
}

function policyTitle(policyType: PolicyType): string {
  if (policyType === "Rental") {
    return "Rental Agreement";
  }
  if (policyType === "Membership") {
    return "Membership Agreement";
  }
  return "Privacy Policy";
}

export default function Policy({ policyType }: PolicyProps) {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const effectiveDate = useMemo(() => resolveDateParam(dateParam), [dateParam]);
  const title = policyTitle(policyType);

  const [content, setContent] = useState("Loading policy content...");
  const [effectiveLabel, setEffectiveLabel] = useState("Effective date: loading");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    const loadPolicy = async () => {
      setStatus("loading");
      setContent("Loading policy content...");
      setEffectiveLabel("Effective date: loading");

      try {
        const data = await fetchPolicy({
          policyType,
          effectiveDate,
        });

        if (cancelled) {
          return;
        }

        if (!data) {
          setStatus("error");
          setContent(emptyMessage);
          setEffectiveLabel("Effective date: unavailable");
          return;
        }

        setStatus("ready");
        setContent(data.content);
        setEffectiveLabel(`Effective date: ${data.policy_effective_date}`);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Error loading policy:", error);
        setStatus("error");
        setContent(emptyMessage);
        setEffectiveLabel("Effective date: unavailable");
      }
    };

    loadPolicy();

    return () => {
      cancelled = true;
    };
  }, [effectiveDate, policyType]);

  return (
    <main className={styles.page}>
      <article className={styles.card}>
        <header className={styles.header}>
          <h1>{title}</h1>
          <p>
            Policy type <strong>{policyType}</strong>
          </p>
          <div className={styles.badges}>
            <span>{effectiveLabel}</span>
            <span className={status === "error" ? styles.errorBadge : ""}>Status: {status}</span>
          </div>
        </header>

        <section className={styles.markdown}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </section>
      </article>
    </main>
  );
}
