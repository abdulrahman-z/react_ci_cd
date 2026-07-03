import { useAppSelector } from "../app/hooks";
import { selectTotalAmount } from "../features/expenses/expensesSlice";

export default function TotalSummary() {
  const total = useAppSelector(selectTotalAmount);

  return (
    <div
      data-testid='total-summary'
      style={{
        padding: "1rem",
        background: "#f9fafb",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        fontWeight: 700,
      }}
    >
      Total: Rs.{total.toFixed(2)}
    </div>
  );
}
