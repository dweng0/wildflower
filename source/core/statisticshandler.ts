import * as WebRequest from 'rest';
import {Campaign} from '../interface/assets/campaign';
import {UrlManifest} from '../interface/urlmanifest';
import { Character } from './character';
export class StatisticsHandler {
      private _campaign: Campaign;

      constructor() {

      }

      loadCampaign(manifest: UrlManifest, campaignId: number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                  WebRequest(manifest.baseUrl + "/campaign/" + campaignId).then((response: WebRequest.Response) => {
                        debugger;
                        this._campaign = <Campaign>JSON.parse(response.entity);
                        resolve();
                  }).catch(
                        (reason) => {reject(reason)}
                  );
            });
      }

      playerDied(characterKilled, killedBy) {

      }

      /**
       * If we have the campaign data, we can set the player ids to the correct characters for better referencing
       * @param characters {Array<Characters>}
       */
      updateCommandersWithPlayerIds(characters: Array<Character>) {
            characters.forEach((character) => {
                  this._campaign.redTeam.players.forEach((player) => {
                        if (player.commander.name === character.getCommanderName()) {
                              character.setPlayerId(player.id);
                        }
                  });
                  this._campaign.blueTeam.players.forEach((player) => {
                        if (player.commander.name === character.getCommanderName()) {
                              character.setPlayerId(player.id);
                        }
                  })
            })
      }
 }