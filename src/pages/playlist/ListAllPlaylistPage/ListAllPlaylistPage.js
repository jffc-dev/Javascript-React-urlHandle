import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import { getPlaylists } from '../../../services/playlists/getAllPlaylists'
import { Link } from 'react-router-dom'

const ListAllPlaylistPage = () => {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylists()
      console.log(data)
      setPlaylists(data)
    }
    fetchData()
  }, [])

  return (
    <Container style={{ paddingTop: '80px', height: '100%' }}>
      <h1>Playlists</h1>
      {playlists.map((playlist, index) => {
        return (
          <Link key={index} to={'/mantenimiento/playlist/detail/' + playlist._id}>
            <button>{playlist._id}</button>
          </Link>
        )
      })}
      <div></div>
    </Container>
  )
}

export default ListAllPlaylistPage
