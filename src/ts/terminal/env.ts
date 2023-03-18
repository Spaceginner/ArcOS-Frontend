import { ArcOSVersion } from "../env/main";
import { ArcTermConfig } from "./config";

export class ArcTermEnv {
  config: ArcTermConfig;

  prompt = "&u: ~/&p $ ";
  greeting = `ArcTerm & ArcOS v${ArcOSVersion}\n\nLicensed under GPLv3. Created by the ArcOS team.`;

  constructor() {
    this.config = new ArcTermConfig(this);
  }
}