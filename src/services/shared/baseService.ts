export class BaseService {
  protected get fetchHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "X-API-Key": process.env.X_API_KEY ?? "",
    };
  }

  protected mergeHeaders(
    additional: Record<string, string>
  ): Record<string, string> {
    return { ...this.fetchHeaders, ...additional };
  }
}
