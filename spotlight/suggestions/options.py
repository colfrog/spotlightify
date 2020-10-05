from math import ceil
from os import getenv

from api.manager import PlaybackManager
from caching.holder import CacheHolder
from spotlight.suggestions.suggestion import Suggestion
from spotlight.suggestions.templates import PassiveSuggestion
from spotlight.suggestions.menu import MenuSuggestion


class OptionSuggestion(Suggestion):
    """
    Shows option suggestions (option_items list of Suggestions) when shift+enter is inputted on this suggestion from
    the Spotlightify Search
    """
    def __init__(self, title: str, description: str, icon: str, function: classmethod, parameter: str, fill_str: str,
                 setting: str, option_items=None):
        Suggestion.__init__(self, title, description, icon, function, parameter, fill_str, setting)
        if option_items is None:
            option_items = []
        self.option_items = option_items


class SongOptions:
    @staticmethod
    def create_song_options(song_name: str, artist_name: str, image_name: str, song_id):
        return [DisplaySongOptionSuggestion(song_name, artist_name, image_name),
                AddToQueueOptionSuggestion(song_name, song_id),
                SaveSongOptionSuggestion(song_name),
                SongRadioOptionSuggestion(song_name, song_id),
                AddToPlaylistOptionSuggestion(song_name, song_id, artist_name, image_name),
                ShareSongOptionSuggestion(song_id)
                ]


class DisplaySongOptionSuggestion(PassiveSuggestion):
    def __init__(self, song_name: str, artist_name: str, image_name: str):
        PassiveSuggestion.__init__(self, f"{song_name} by {artist_name}", "Options", image_name)


class AddToQueueOptionSuggestion(Suggestion):
    def __init__(self, song_name, song_id):
        Suggestion.__init__(self, f"Add to Queue", f"Queue '{song_name}'", "queue", PlaybackManager.queue_song,
                      "", song_id, "exe")


class SaveSongOptionSuggestion(Suggestion):
    def __init__(self, song_name):
        Suggestion.__init__(self, f"Save Song", f"Save '{song_name}'", "heart", PlaybackManager.toggle_like_song,
                      "", "", "exe")


class SongRadioOptionSuggestion(Suggestion):
    def __init__(self, song_name, song_id):
        Suggestion.__init__(self, f"Go to Song Radio", f"Start '{song_name}' Radio", "radio", PlaybackManager.play_recommended,
                      "", song_id, "exe")


class AddToPlaylistOptionSuggestion(MenuSuggestion):
    def __init__(self, song_name, song_id, artist_name, image_name):
        MenuSuggestion.__init__(self, f"Add to Playlist", f"Add '{song_name}' to Playlist", "playlist", "", [], fill_prefix=False)
        self.song_id = song_id
        self.song_name = song_name
        self.artist_name = artist_name
        self.image_name = image_name
        self.current_page = 0

    def refresh_menu_items(self):
        # get relevant info from playlists
        playlists = []
        for key, value in CacheHolder.playlist_cache["playlists"].items():
            if value["owner"] == getenv('SPOTIFY_USERNAME'):  # TODO Change to something more solid e.g. singleton
                playlists.append({"name": value["name"], "id": key})



        # create pages list
        len_ = len(playlists)
        num_pages = ceil(len_/4)

        # append back item
        back_item = MenuSuggestion("Back", f"Page 1 of {num_pages}", "exit", "",
                                   SongOptions.create_song_options(self.song_name, self.artist_name, self.image_name, self.song_id),
                                   fill_prefix=False)
        self.menu_items.append(back_item)

        # make playlist suggestions list
        for i in range(0, len_):
            playlist = playlists[i]
            ids = {"song": self.song_id, "playlist": playlists[i]["id"]}
            self.menu_items.append(Suggestion(playlist["name"], f"Add to {playlist['name']}", playlist['id'],
                                     PlaybackManager.add_to_playlist, "", ids, "exe"))

        super(AddToPlaylistOptionSuggestion, self).refresh_menu_items()  # always call super at end for paging


class ShareSongOptionSuggestion(Suggestion):
    def __init__(self, song_id):
        Suggestion.__init__(self, f"Share Song URL", f"Copy URL to Clipboard", "share", PlaybackManager.copy_url_to_clipboard,
                      "", song_id, "exe")
