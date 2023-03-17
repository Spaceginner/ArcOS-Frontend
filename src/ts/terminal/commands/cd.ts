import { getDirectory } from "../../api/fs/directory";
import { getParentDirectory } from "../../api/fs/main";
import type { Command } from "../interface";

export const Cd: Command = {
  keyword: "cd",
  async exec(cmd, argv, term) {
    const dir = argv.join(" ");
    const newDir = (term.path != "./" ? `${term.path}/${dir}` : dir).replaceAll(
      "//",
      "/"
    );

    if (dir == "..") {
      term.path = getParentDirectory(term.path as string);

      return;
    }

    if (dir == ".") return;

    if (!(await getDirectory(newDir)))
      return term.util.writeLine(`Can't change to "${dir}": Path not found`);

    term.path = newDir;
  },
  description: "Change directory",
};
