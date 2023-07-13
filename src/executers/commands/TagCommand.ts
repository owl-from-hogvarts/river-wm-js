import { ETagAction, ETagActionScope, Tag } from "../../object-model/actions/Tags.js";
import { BaseCommand } from "./Command.js"


const TagActionMap = {
  [ETagAction.SET]: "set",
  [ETagAction.TOGGLE]: "toggle"
}

const TagActionScopeMap = {
  [ETagActionScope.FOCUSED]: "focused",
  [ETagActionScope.VIEW]: "view",
}

export class TagCommad extends BaseCommand {
  override readonly command: string;
  override readonly args: string[] = [];

  constructor(action: ETagAction, scope: ETagActionScope, tag: Tag) {
    super()
    
    this.command = `${TagActionMap[action]}-${TagActionScopeMap[scope]}-tags`
    this.args.push(tag.toFixed())
  }
}
