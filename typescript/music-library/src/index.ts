type TrackId = number;
type ArtistName = string;

type Track = {
    id: TrackId;
    title: string;
    artist: ArtistName;
    liked: boolean;
};

function describeTrack(track: Track): string {
    return `${track.title} by ${track.artist}`;
}

const tracks: Track[] = [
    { id: 1, title: "Blue Light", artist: "Jorja Smith", liked: true },
    { id: 2, title: "Nights", artist: "Frank Ocean", liked: false },
];

console.log(describeTrack(tracks[0]));
