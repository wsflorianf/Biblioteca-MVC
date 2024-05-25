import { Forward } from "@mui/icons-material";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function SelectionCard({icon, title, text}:{icon: ReactNode, title: string, text: string}) {
  return (
    <Card>
      <CardContent className='section-card'>
        {icon}
        <Typography variant='h5' color={'#fff'}>{title}</Typography>
      </CardContent>
      <CardActions>
        <Typography padding={'15px'}>{text}</Typography>
        <Forward />
      </CardActions>
    </Card>
  )
}
