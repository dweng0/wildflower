/**
 * Focuses on setting up the signalR connections for this client
 */
export declare class TransportLayer {
    private hubConnectionUrl;
    private campaignUrl;
    private logging;
    private model;
    private api;
    private onComplete;
    private clientHub;
    private campaignId;
    constructor(campaignId: number, responseFunctions: any, getCampaignDataComplete: any, handShakeComplete: any);
    handshake(responseFunctions: any): void;
    handshakeSuccess(): void;
    handshakeError(): void;
}
