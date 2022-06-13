import React from 'react';
import ReactDOM from 'react-dom/client';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Icon from '@mui/material/Icon';
import './index.css';
import Editor from "@monaco-editor/react";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editor: null, value: 0, tab1: '', tab2: 'hidden', tab3: 'hidden', config: {lang: 'javascript', dark: 'light'}}
  }
  setValue(newValue) {
    const current_state = this.state
    current_state.value = newValue
    this.setState(current_state)
  }
  showTab(tab) {
    const current_state = this.state
    current_state.tab1 = 'hidden'
    current_state.tab2 = 'hidden'
    current_state.tab3 = 'hidden'
    switch (tab) {
      case 0: current_state.tab1 = ''; break;
      case 1: current_state.tab2 = ''; break;
      case 2: current_state.tab3 = ''; break;
      default: current_state.tab1 = ''; break;
    }
    this.setState(current_state)
  }
  changeLang(newLang) {
    const current_state = this.state
    current_state.config.lang = newLang.target.value
    this.setState(current_state)
  }
  changeDark(newDark) {
    const current_state = this.state
    if (newDark.target.checked) {current_state.config.dark = 'vs-dark'}
    else {current_state.config.dark = 'light'}
    this.setState(current_state)
  }
  handleEditorMount(editor, monaco) {
    const current_state = this.state
    current_state.editor = editor
    this.setState(current_state)
  }
  render() {
    return (
      <div>
        <div className={this.state.tab1}><Editor
     height="90vh"
     defaultLanguage="javascript"
     defaultValue="// some comment"
     language={this.state.config.lang}
     theme={this.state.config.dark}
     onMount={this.handleEditorMount.bind(this)}
     loading={<img src="loading.gif" alt="Loading..."></img>}
   /></div>
        <div className={this.state.tab2}>

        </div>
        <div className={this.state.tab3}>
          <Container fixed>
            <h3>Configure ChromeDev</h3>
            <TextField fullWidth label="Editor Language" variant="outlined" defaultValue="javascript" name="test" onChange={this.changeLang.bind(this)} />
            <FormControlLabel control={<Checkbox />} label="Editor Dark Mode" onChange={this.changeDark.bind(this)} />
  <InputLabel id="run-config-label">Run Configuration</InputLabel>
  <Select
  fullWidth
    labelId="run-config-label"
    label="Run Configuration"
    id="run-config"
    //onChange={handleChange}
  >
    <MenuItem value="js">Javascript Evaluation</MenuItem>
    <MenuItem value={20} disabled>PyScript (soon)</MenuItem>
    <MenuItem value={30} disabled>Brython (soon)</MenuItem>
  </Select>
            <p>Site Dark Mode is on it's way!</p>
          </Container>
        </div>
        <BottomNavigation className="bottom"
  showLabels
  value={this.state.value}
  onChange={(event, newValue) => {
    this.setValue(newValue);
    this.showTab(newValue)
  }}
>
  <BottomNavigationAction label="Code" icon={<Icon>code</Icon>} />
  <BottomNavigationAction label="Run" icon={<Icon>play_arrow</Icon>} />
  <BottomNavigationAction label="Configure" icon={<Icon>settings</Icon>} />
</BottomNavigation>
      </div>
    )
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App></App>)
