import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import WorkIcon from '@material-ui/icons/Work';
import React from 'react';

interface PropsProfileData {
  graphData: {
    displayName: string;
    jobTitle: string;
    mail: string;
    businessPhones: string;
    officeLocation: string;
  };
}

export default function ProfileData({ graphData }: PropsProfileData) {
  return (
    <List className="profileData">
      <NameListItem name={graphData.displayName} />
      <JobTitleListItem jobTitle={graphData.jobTitle} />
      <MailListItem mail={graphData.mail} />
      <PhoneListItem phone={graphData.businessPhones[0]} />
      <LocationListItem location={graphData.officeLocation} />
    </List>
  );
}

interface PropsNameListItem {
  name: string;
}
const NameListItem = ({ name }: PropsNameListItem) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <PersonIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Name" secondary={name} />
  </ListItem>
);

interface PropsTitleListItem {
  jobTitle: string;
}
const JobTitleListItem = ({ jobTitle }: PropsTitleListItem) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <WorkIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Title" secondary={jobTitle} />
  </ListItem>
);

interface PropsMailListItem {
  mail: string;
}
const MailListItem = ({ mail }: PropsMailListItem) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <MailIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Mail" secondary={mail} />
  </ListItem>
);

interface PropsPhoneListItem {
  phone: string;
}
const PhoneListItem = ({ phone }: PropsPhoneListItem) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <PhoneIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Phone" secondary={phone} />
  </ListItem>
);

interface PropsLocationListItem {
  location: string;
}
const LocationListItem = ({ location }: PropsLocationListItem) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <LocationOnIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Location" secondary={location} />
  </ListItem>
);
