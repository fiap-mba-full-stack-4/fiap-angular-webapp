export const environment = {
    production: true,
    gatewayApiUrl: (window as any)["envconfig"]["gatewayApiUrl"] || "default"
};
