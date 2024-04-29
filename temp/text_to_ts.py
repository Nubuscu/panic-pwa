"""A helper script to move all text content into a strings.ts file for easier dev work later.


text content from the Panic at the Dojo source book, courtesy of reddit
(comments of https://www.reddit.com/r/rpg/comments/14cyf0f/panic_at_the_dojo_character_and_npc_sheet/)


"""

import csv
import json
import re
from functools import partial
from collections import defaultdict

drop_bad_char = partial(re.sub, r"[?!',.]", "")
underscore_bad_char = partial(re.sub, r"[- ]", "_")
plus_sub_char = partial(re.sub, r"\+", "_PLUS")


def const_name(*strings: str):
    return "_".join(
        underscore_bad_char(drop_bad_char(plus_sub_char(string))).upper()
        for string in strings
    )


def split_costs_str(raw_costs):
    number_costs = []
    token_costs = []
    token_costs_pattern = r"(\d) (\w+(?: or [\w]+)*) token(?:s)*"
    number_costs_pattern = r"(?: or )*(\d+\+)"
    if matches := re.findall(token_costs_pattern, raw_costs.lower()):
        num, types_str = matches[0]
        token_costs += [(num, type_) for type_ in types_str.split(" or ")]

    if matches := re.findall(number_costs_pattern, raw_costs):
        number_costs += matches
    # could be:
    # 3+ 6+
    # 2+ or 5+
    # 3 basic tokens
    # 3 speed or iron tokens
    # 3+ and 3+
    # X
    remainder = raw_costs
    return number_costs, token_costs, raw_costs


def nesting_dict():
    return defaultdict(nesting_dict)


FORMS = nesting_dict()
ARCHETYPES = nesting_dict()
STYLES = nesting_dict()
BUILDS = []


def try_parse_dice_cost(cost_str: str) -> list[int | str]:
    cost_str = cost_str.replace("+", "")
    if cost_str.isdigit():
        return [int(cost_str)]
    return [cost_str]


def parse_lines(reader) -> list[str]:
    output_lines = []
    for row in reader:
        match row:
            case ["Form", _, name, dice, desc, *_]:
                dice_formatted = ", ".join([f"Dice.{d}" for d in dice.split(" ")])
                FORMS[name]["ability"]["description"] = desc
                FORMS[name]["actionDice"] = dice_formatted
                FORMS[name]["name"] = name

            case ["Form-Action", form, action_name, costs, desc, *_]:
                number_costs, token_costs, other_costs = split_costs_str(costs)
                levels = [
                    {"diceCost": try_parse_dice_cost(number_cost), "description": desc}
                    for number_cost in number_costs
                ]
                levels += [
                    {
                        "tokenCost": [
                            {
                                "number": int(token_cost[0]),
                                "tokenType": f"Token.{token_cost[1].capitalize()}",
                            }
                        ],
                        "description": desc,
                    }
                    for token_cost in token_costs
                ]
                if not levels:
                    levels = [{"otherCost": [other_costs], "description": desc}]
                FORMS[form]["actions"][action_name] = {
                    "name": action_name,
                    "levels": levels,
                }
            case ["Build", _, name, _, desc, *_]:
                BUILDS.append({"name": name, "description": desc})

            case ["Focused Archetype", _name, archetype, _, ability, *_]:
                ARCHETYPES[archetype]["name"] = archetype
                ARCHETYPES[archetype]["focusedAbility"] = {"description": ability}

            case ["Fused Archetype", _name, archetype, _, ability, *_]:
                ARCHETYPES[archetype]["name"] = archetype
                ARCHETYPES[archetype]["fusedAbility"] = {"description": ability}

            case ["Frantic Archetype", _name, archetype, _, ability, *_]:
                ARCHETYPES[archetype]["name"] = archetype
                ARCHETYPES[archetype]["franticAbility"] = {"description": ability}

            case ["Archetype Style", archetype, name, range_, ability, *_]:
                STYLES[name]["parentArchetypeName"] = archetype
                STYLES[name]["name"] = name
                if range_.lower() == "no":
                    ranges = [range_]
                else:
                    ranges = [int(r) for r in range_.split("-")]
                STYLES[name]["minRange"] = ranges[0]
                STYLES[name]["maxRange"] = ranges[-1]
                STYLES[name]["ability"] = {"description": ability}

            case ["Style Action", style, action_name, costs, desc, *_]:
                number_costs, token_costs, other_costs = split_costs_str(costs)
                levels = [
                    {"diceCost": try_parse_dice_cost(number_cost), "description": desc}
                    for number_cost in number_costs
                ]
                levels += [
                    {
                        "tokenCost": [
                            {
                                "number": int(token_cost[0]),
                                "tokenType": f"Token.{token_cost[1].capitalize()}",
                            }
                        ],
                        "description": desc,
                    }
                    for token_cost in token_costs
                ]
                if not levels:
                    levels = [{"otherCost": [other_costs], "description": desc}]
                STYLES[style]["actions"][action_name] = {
                    "name": action_name,
                    "levels": levels,
                }
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

    parsed_forms = []
    for form in FORMS.values():
        form["actions"] = [a for a in form["actions"].values()]
        parsed_forms.append(form)
    parsed_styles = []
    for style in STYLES.values():
        style["actions"] = [a for a in style["actions"].values()]
        parsed_styles.append(style)
    parsed_archetypes = list(ARCHETYPES.values())
    with open("./GENERATED_strings.ts", "w") as outfile:
        # TODO codegen, not just strings
        outfile.write(
            "import { Dice, Token, type Form, type Style, type Archetype, type Build } from './types';\n"
        )
        outfile.write(
            f"export const forms: Form[] = {json.dumps(parsed_forms, indent=4)};\n"
        )
        outfile.write(
            f"export const archetypes: Archetype[] = {json.dumps(parsed_archetypes, indent=2)};\n"
        )
        outfile.write(
            f"export const styles: Style[] = {json.dumps(parsed_styles, indent=2)};\n"
        )
        outfile.write(
            f"export const builds: Build[] = {json.dumps(BUILDS, indent=2)};\n"
        )

        for line in sorted(out):
            outfile.write(line)
            outfile.write(";\n")


if __name__ == "__main__":
    main()
