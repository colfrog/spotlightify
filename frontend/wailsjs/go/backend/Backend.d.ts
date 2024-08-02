// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {model} from '../models';
import {spotify} from '../models';
import {backend} from '../models';

export function ChangeRepeatState(arg1:string):Promise<void>;

export function ChangeShuffle(arg1:boolean):Promise<void>;

export function ExecuteCommand(arg1:string,arg2:{[key: string]: string}):Promise<model.ExecuteActionOutput>;

export function GetAlbumsByQuery(arg1:string):Promise<Array<spotify.SimpleAlbum>>;

export function GetArtistsByQuery(arg1:string):Promise<Array<spotify.FullArtist>>;

export function GetCurrentlyPlayingTrack():Promise<backend.CurrentlyPlayingTrack>;

export function GetDevices():Promise<Array<spotify.PlayerDevice>>;

export function GetEpisodesByShowID(arg1:string):Promise<Array<spotify.EpisodePage>>;

export function GetPlaylistsByQuery(arg1:string):Promise<Array<spotify.SimplePlaylist>>;

export function GetRepeatState():Promise<string>;

export function GetShowsByQuery(arg1:string):Promise<Array<spotify.FullShow>>;

export function GetSuggestions(arg1:string,arg2:string,arg3:{[key: string]: string}):Promise<model.SuggestionList>;

export function GetTracksByQuery(arg1:string):Promise<Array<spotify.SimpleTrack>>;

export function IsCurrentSongLiked():Promise<boolean>;

export function IsShuffled():Promise<boolean>;

export function LikeCurrentSong(arg1:boolean):Promise<void>;

export function Next():Promise<void>;

export function Pause():Promise<void>;

export function PlayAlbum(arg1:string):Promise<void>;

export function PlayArtistsTopTracks(arg1:string):Promise<void>;

export function PlayPlaylist(arg1:string):Promise<void>;

export function PlayPodcast(arg1:string):Promise<void>;

export function PlayTrack(arg1:string):Promise<void>;

export function Previous():Promise<void>;

export function QueueTrack(arg1:string):Promise<void>;

export function Resume():Promise<void>;

export function Seek(arg1:number):Promise<void>;

export function SetActiveDevice(arg1:string):Promise<void>;

export function SetVolume(arg1:number):Promise<void>;

export function Shuffle(arg1:boolean):Promise<void>;
