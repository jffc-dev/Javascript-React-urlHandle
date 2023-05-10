const AleatorioUrlsBdPageHead = ({
  handleContador,
  startCounter,
  stopCounter,
  nroResultados,
  handleChangeResultados,
  OpenConfirmModalRandom,
  linkCount,
  currentLink,
  cadenas,
  setCurrentLink,
  openCurrentLink,
  randomPage
}) => {
  return (
    <div className="random__contenedor">
      <div className="random__contenedor__contador">
        {randomPage && (
          <>
            <button
              onClick={() => {
                handleContador('-')
              }}
              onMouseDown={() => {
                startCounter('-')
              }}
              onMouseUp={stopCounter}
              onMouseLeave={stopCounter}>
              -
            </button>
            <input value={nroResultados} onChange={handleChangeResultados}></input>
            <button
              onClick={() => {
                handleContador('+')
              }}
              onMouseDown={() => {
                startCounter('+')
              }}
              onMouseUp={stopCounter}
              onMouseLeave={stopCounter}>
              +
            </button>
          </>
        )}
      </div>
      <div className="random__contenedor__botones">
        {randomPage && (
          <div className="random__contenedor__botones_btn">
            <button
              onClick={() => {
                OpenConfirmModalRandom()
              }}>
              Get links
            </button>
          </div>
        )}
        <div className="random__contenedor__botones_btn">
          <button
            disabled={linkCount === currentLink}
            onClick={() => {
              openCurrentLink(cadenas, currentLink, setCurrentLink)
            }}>
            Open URL
          </button>
          <div className="random__contenedor__botones_div">
            {currentLink === -1 ? '' : currentLink}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AleatorioUrlsBdPageHead
