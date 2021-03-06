import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import Container from "../../../containers/container"
import Layout from "../../common/Layout"
import LyricsDialog from "../../dialog/LyricsDialog"

import { IconButton } from "@material-ui/core"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import YouTubeIcon from "@material-ui/icons/YouTube"

const Album = (props) => {
  const history = useHistory()
  const { album, setAlbum } = props
  const { albumSeq } = props.match.params
  const [lyricsDialog, setLyricsDialog] = useState({ open: false, track: {} })

  useEffect(() => {
    setAlbum(albumSeq)
  })

  if (Object.keys(album).length === 0) return null

  return (
    <Layout>
      <LyricsDialog open={lyricsDialog.open} onClose={() => setLyricsDialog({ open: false, track: {} })} track={lyricsDialog.track} />
      <Section>
        <img src={album.imageUri} alt={"앨범 이미지"} />
        <UL>
          <LI>
            <p>NO.</p>
            <p>TITLE</p>
            <p>LYRICS</p>
            <p>MV</p>
          </LI>

          {album.track.map((i, idx) => (
            <LI key={idx}>
              <p>{i.trackNo}</p>
              <p>{i.title}</p>
              <p>
                <IconButton style={{ padding: "0px", borderRadius: "0px" }} onClick={() => setLyricsDialog({ open: true, track: i })}>
                  <LibraryBooksIcon />
                </IconButton>
              </p>
              <p>
                {i.mvUri === "" ? null : (
                  <IconButton style={{ padding: "0px", borderRadius: "0px" }} onClick={() => history.push(`/albums/${albumSeq}/${i.trackNo}`)}>
                    <YouTubeIcon />
                  </IconButton>
                )}
              </p>
            </LI>
          ))}
        </UL>
      </Section>
    </Layout>
  )
}

export default Container(Album)

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > img {
    width: 524px;
    object-fit: cover;
  }
  & svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    & > img {
      width: 90%;
      max-width: 524px;
    }
    & svg {
      width: 20px;
      height: 20px;
    }
  }
`
const UL = styled.ul`
  width: 524px;
  height: fit-content;
  margin-top: 20px;
  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 524px;
  }
`
const LI = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  & > p {
    width: 50px;
    padding: 0;
    font-size: 15px;
    text-align: center;
    &:nth-child(2) {
      flex: 1;
      font-size: 15px;
      text-align: left;
    }
  }
`
