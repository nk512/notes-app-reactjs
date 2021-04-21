import { makeStyles } from '@material-ui/core'
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { format } from 'date-fns'
import Avatar from '@material-ui/core/Avatar'

const drawerWidth = 240
const useStyles = makeStyles((theme) => {
    return{
        page:{
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer:{
            width: drawerWidth
        },
        drawerPaper:{
            width: drawerWidth
        },
        root:{
            display: 'flex'
        },
        active:{
            background: '#f4f4f4'
        },
        title:{
            padding: theme.spacing(2)
        },
        appbar:{
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date:{
            flexGrow: 1
        },
        avatar:{
            marginLeft: theme.spacing(1)
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlined color="secondary" />,
            path: '/create'  
        }
    ]

    return(
        <div className={classes.root}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.date}>
                        { format(new Date(), 'do MMMM y') }
                    </Typography>
                    <Typography>
                        Nitin
                    </Typography>
                    <Avatar src="/avatar.png" className={classes.avatar} />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{paper: classes.drawerPaper}}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        NOTE PAD
                    </Typography>
                </div>
                <List>
                    {menuItems.map((item) =>(
                        <ListItem 
                            key={item.text}
                            button
                            onClick={() => history.push(item.path)}
                            className={location.pathname == item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
        
    )
}