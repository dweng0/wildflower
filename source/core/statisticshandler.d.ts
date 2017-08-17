import { UrlManifest } from '../interface/urlmanifest';
import { Character } from './character';
export declare class StatisticsHandler {
    private _campaign;
    constructor();
    loadCampaign(manifest: UrlManifest, campaignId: number): Promise<any>;
    playerDied(characterKilled: any, killedBy: any): void;
    /**
     * If we have the campaign data, we can set the player ids to the correct characters for better referencing
     * @param characters {Array<Characters>}
     */
    updateCommandersWithPlayerIds(characters: Array<Character>): void;
}
