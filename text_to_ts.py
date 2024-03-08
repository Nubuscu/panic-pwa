"""A helper script to move all text content into a strings.ts file for easier dev work later.


text content from the Panic at the Dojo source book, courtesy of reddit
(comments of https://www.reddit.com/r/rpg/comments/14cyf0f/panic_at_the_dojo_character_and_npc_sheet/)


"""

import csv
import re
from functools import partial

drop_bad_char = partial(re.sub, r"[?!',.]", "")
underscore_bad_char = partial(re.sub, r"[- ]", "_")
plus_sub_char = partial(re.sub, r"\+", "_PLUS")

get_action_numbers = partial(re.findall, r"\d+\+")


def const_name(*strings: str):
    return "_".join(
        underscore_bad_char(drop_bad_char(plus_sub_char(string))).upper()
        for string in strings
    )


def parse_multi_costs(costs, raw_desc):
    if "token" in costs.lower():
        return {costs: raw_desc}
    action_numbers = get_action_numbers(costs)
    desc_lines = raw_desc.split("\n")
    return {
        num: line
        for num, line in zip(action_numbers, desc_lines)
    }


def parse_lines(reader) -> list[str]:
    output_lines = []
    for row in reader:
        match row:
            case ["Form", _, name, dice, desc, *_]:
                output_lines.append(
                    f"export const FORM_{const_name(name)}_DESC = `{desc}`"
                )
                dice_formatted = ", ".join([f"Dice.{d}" for d in dice.split(" ")])
                output_lines.append(
                    f"export const FORM_{const_name(name)}_DICE = [{dice_formatted}]"
                )
            case ["Form-Action", form, action_name, costs, desc, *_]:
                var_prefix = f"FORM_{const_name(form, action_name)}"
                costs_dict = parse_multi_costs(costs, desc)
                for level_cost, level_desc in costs_dict.items():
                    output_lines.append(
                        f"export const FORM_{const_name(form, action_name, level_cost)}_DESC = `{level_desc}`"
                    )
            case ["Build", _, name, _, desc, *_]:
                output_lines.append(
                    f"export const BUILD_{const_name(name)}_DESC = `{desc}`"
                )
            case [
                ("Focused Archetype" | "Fused Archetype" | "Frantic Archetype"),
                name,
                _archetype,
                _,
                ability,
                *_,
            ]:
                output_lines.append(
                    f"export const ARCH_{const_name(name)}_ABILITY = `{ability}`"
                )
            case ["Archetype Style", archetype, name, range_, ability, *_]:
                var_prefix = f"STYLE_{const_name(archetype, name)}"
                output_lines.append(f"export const {var_prefix}_RANGE = `{range_}`")
                output_lines.append(f"export const {var_prefix}_ABILITY = `{ability}`")
            case ["Style Action", archetype, action_name, costs, desc, *_]:
                costs_dict = parse_multi_costs(costs, desc)
                for level_cost, level_desc in costs_dict.items():
                    output_lines.append(
                        f"export const STYLE_{const_name(archetype, action_name, level_cost)}_DESC = `{level_desc}`"
                    )
            case [("Boss Archetype" | ""), *_]:
                # suppress known errors - skipping boss archetypes for now
                # some empty lines in source too
                pass
            case _:
                print(f"failed to parse line: {row}")

    return output_lines


def main():
    with open("./raw_text_db.csv", "r") as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # skip header row
        out = parse_lines(reader)

    with open("./GENERATED_strings.ts", "w") as outfile:
        outfile.write("import { Dice } from './types';\n")
        for line in sorted(out):
            outfile.write(line)
            outfile.write(";\n")


if __name__ == "__main__":
    main()
