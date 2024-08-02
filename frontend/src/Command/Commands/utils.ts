import { spotify } from "../../../wailsjs/go/models";
import SimpleArtist = spotify.SimpleArtist;
import { Suggestion, SuggestionList } from "../../types/command";
import Icon from "../../types/icons";
import { Show } from "../../../wailsjs/runtime";

// TODO: at some point, we should probably move this to the backend for efficiency
export function CombinedArtistsString(artists: SimpleArtist[]): string {
  if (artists.length === 0) return "";
  if (artists.length === 1) return artists[0].name;
  if (artists.length === 2) return `${artists[0].name} and ${artists[1].name}`;

  const allButLast = artists
    .slice(0, -1)
    .map((a) => a.name)
    .join(", ");
  const last = artists[artists.length - 1].name;
  return `${allButLast} and ${last}`;
}

export function HandleGenericError(
  opName: string,
  error: any,
  setSuggestions: (suggestions: SuggestionList) => void
) {
  setSuggestions({
    items: [
      {
        title: `${opName} error`,
        description: String(error),
        icon: Icon.Error,
        id: `${opName}-error`,
      },
    ],
  });
  Show();
}

export function DeviceIconSelector(deviceType: string): Icon {
  switch (deviceType) {
    case "Computer":
      return Icon.Computer;
    case "Smartphone":
      return Icon.Smartphone;
    case "Speaker":
      return Icon.Speaker;
    default:
      return Icon.Device;
  }
}
