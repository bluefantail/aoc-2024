import { reportsInput } from "../input.ts";

export const d2p2 = (): string => {
  const dampenerOnline = true; // Disable for part 1 result

  const reports: number[][] = reportsInput
  .split("\n")
  .map((r) => r.split(" ").map(Number));

  const safeReports: number[][] = reports.filter(
    (report: number[], i: number) => {
      function safetyTest(report: number[]): boolean {
        const reportLength = report.length;

        const changes: number[] = report
          .map((l: number, i: number) => {
            return i < reportLength - 1 ? report[i + 1] - l : 0;
          })
          .slice(0, -1);

        const allIncreasing: boolean = changes.every(
          (n: number) => n > 0 && n < 4
        );

        const allDecreasing: boolean = changes.every(
          (n: number) => n < 0 && n > -4
        );

        return allIncreasing || allDecreasing;
      }

      let allIncreasingOrDecreasing: boolean = safetyTest(report);

      let dampenerAttempt = 0;

      while (
        !allIncreasingOrDecreasing &&
        dampenerOnline &&
        dampenerAttempt < report.length
      ) {
        const dampenedReport: number[] = report.filter(
          (n: number, i: number) => i !== dampenerAttempt
        );
        allIncreasingOrDecreasing = safetyTest(dampenedReport);
        dampenerAttempt++;
      }

      return allIncreasingOrDecreasing;
    }
  );

  return `Safe reports: ${safeReports.length}`;
}
