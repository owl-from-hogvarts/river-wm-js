import { ETagAction, ETagActionScope, Tag } from "../../object-model/Tags";
import { BaseCommand } from "./Command"


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
