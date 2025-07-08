import { Anchor } from "@mantine/core";
import YouTube from "react-youtube";

type Props = {
  url: string;
  label?: string;
};

function extractYouTubeVideoId(url: string): string | undefined {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return undefined;
  }
}

export default function MediaEmbed(props: Props) {
  console.log(props.url);
  const youtube = extractYouTubeVideoId(props.url);

  console.log(youtube);

  if (!!youtube) {
    return <YouTube videoId={youtube} />;
  }
  return (
    <Anchor href={props.url} target="_blank">
      {props.url}
    </Anchor>
  );
}
