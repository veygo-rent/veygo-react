import { useSearchParams } from "react-router";

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
    return (
        <div>
            <h1>Privacy Page</h1>
            <h2>The requested date is { date.toISOString().slice(0, 10) }</h2>
        </div>
    );
}