import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link, useHistory } from "react-router-dom"
import MenuIcon from "@material-ui/icons/Menu"
import { darkColors, whiteColors } from "../../utils/color"
import Toggle from "./Toggle"

const Header = (props) => {
  const history = useHistory()
  const { hamberger, setHamberger } = props
  const [toggle, setToggle] = useState(localStorage.getItem("darkMode") === "true")

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        setHamberger(false)
      }
    })

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth > 1024) {
          setHamberger(false)
        }
      })
    }
  }, [])

  const setColorMode = (colorMode) => {
    for (const [key, value] of Object.entries(colorMode)) {
      document.documentElement.style.setProperty(`--${key}`, `${value}`)
    }
  }

  setColorMode(localStorage.getItem("darkMode") === "true" ? darkColors : whiteColors)

  return (
    <Container>
      <LogoLink to="/">ZIOR PARK</LogoLink>
      <OpacityView hamberger={hamberger} onClick={() => setHamberger(false)} />
      <NaviView id={"navi"} hamberger={hamberger} onClick={(e) => e.stopPropagation()}>
        <Toggle
          value={toggle}
          setValue={() => {
            const bool = !toggle
            setColorMode(toggle ? whiteColors : darkColors)
            setToggle(bool)
            localStorage.setItem("darkMode", `${bool}`)
          }}
        />

        <LogoLink className={history.location.pathname.includes("introduce") ? "active" : ""} to="/introduce">
          Introduce
        </LogoLink>
        <LogoLink className={history.location.pathname.includes("shop") ? "active" : ""} to="/shop">
          Shop
        </LogoLink>
        <LogoLink className={history.location.pathname.includes("album") ? "active" : ""} to="/albums">
          Albums
        </LogoLink>
        <LogoLink className={history.location.pathname.includes("talk") ? "active" : ""} to="/talks">
          Talks
        </LogoLink>
      </NaviView>

      <Hamberger
        onClick={(e) => {
          e.stopPropagation()
          setHamberger(!hamberger)
        }}
      >
        <MenuIcon />
      </Hamberger>
    </Container>
  )
}

export default Header

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;

  @media (max-width: 1024px) {
    padding: 40px 10px 0px;
  }

  @media (max-width: 768px) {
    padding: 25px 10px 0px;
  }
`
const LogoLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--text);
  font-size: 30px;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;

  &.active {
    color: #4351af;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`
const NaviView = styled.div`
  background-color: var(--background);
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  margin-left: 30px;
  z-index: 100;
  & > a {
    color: var(--text);
    font-size: 20px;
    font-family: "Times New Roman", Times, serif;
  }
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: ${(props) => (props.hamberger ? "0" : "-999")}px;
    display: block;
    width: 250px;
    height: 100%;
    margin-left: 0;
    padding-top: 55px;
    padding-left: 10px;
    & > a {
      margin-bottom: 15px;
    }
  }
  @media (max-width: 360px) {
    width: 70%;
  }
`
const OpacityView = styled.div`
  background-color: rgba(0, 0, 0, 0.35);
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.hamberger ? "flex" : "none")};
  width: 100%;
  height: 100%;
  z-index: 99;
`
const Hamberger = styled.button`
  display: none;
  width: 30px;
  height: 30px;
  & svg {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 1024px) {
    display: block;
  }
`
