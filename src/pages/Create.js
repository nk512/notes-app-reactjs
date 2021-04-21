import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlledLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import { KeyboardArrowRight } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router'

const useStyles = makeStyles({
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }
})
export default function Create() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState("money")

  const handleSubmit = (e) => {
    e.preventDefault()
    title ? setTitleError(false) : setTitleError(true)
    details ? setDetailsError(false) : setDetailsError(true)
    if(title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify({ title, details, category})
      }).then(() => history.push('/'))
    }
  }
  return (
    <Container>
      <Typography className={classes.heading} variant="h6" color="textSecondary" gutterBottom>
        Create a New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          required
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlledLabel value="money" control={<Radio />} label="Money" />
            <FormControlledLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlledLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlledLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" color="primary" variant="contained" endIcon={<KeyboardArrowRight />}>
          Submit
        </Button>
      </form>
    </Container>
  )
}
