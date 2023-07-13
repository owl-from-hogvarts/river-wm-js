/* 
    Copyright (C) 2023  owl-from-hogvarts

    This program is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Lesser GNU General Public License for more details.

    You should have received a copy of the Lesser GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

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
