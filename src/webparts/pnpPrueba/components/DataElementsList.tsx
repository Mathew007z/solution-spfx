import "@pnp/sp/webs";
import "@pnp/sp/lists";
import React, { useState, useEffect } from "react";
import { sp } from "@pnp/sp/presets/all";
import { FontSizes } from '@fluentui/theme';
import { getTheme } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import moment from "moment";

const DataElementList = () => {

  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  // theme para generar el shadow en las cards
  const theme = getTheme();

  // Icon para importar la inicalizacion y luego la refencia al nombre del icono.
  const MyIcon = () => <Icon iconName="EntitlementPolicy" style={{fontSize:'40px',textAlign:'center'}}/>;
  initializeIcons();


  const upcomingDays = 7; // Cantidad de días considerados como "próximos cumpleaños"

  const filterUpcomingBirthdays = (items:any) => {
    const today = moment();
  
    const upcoming = items.filter((item:any) => {
      const birthday = moment(item.Nacimiento, 'yyyy-MM-ddTHH:mm:ssZ');
      const daysUntilBirthday = birthday.diff(today, 'days');
      return daysUntilBirthday >= 0 && daysUntilBirthday <= upcomingDays;

    });
  
    return upcoming;
  };
 

  useEffect(() => {
    sp.setup({
      sp: {
        baseUrl: "https://ytbrv.sharepoint.com/sites/SharePointPrueba"
      }
    });
    sp.web.lists.getByTitle("nacimientos").items.get().then((items) => {
      console.log(items);
      setUpcomingBirthdays(filterUpcomingBirthdays(items));
      console.log(upcomingBirthdays);
    }).catch((error) => {
      console.log(error);
    });
  
  }, []);


  return (
    <div className="ms-Grid">
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
        <div className="LayoutPage-demoBlock">
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row-reverse'}}>
            <MyIcon/>
             <h1 style={{ fontSize: FontSizes.size24, textAlign:'center'}}>Lista de proximos cumple años</h1>
          </div>
      
          {upcomingBirthdays.map((product) => (
            <div key={product.Title} style={{
              border:'1px solid #000', 
              padding:'30px 15px',
              borderRadius:'20px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'column',
              width:'17em',
              margin:'25px auto',
              boxShadow: theme.effects.elevation64
            }}>
              <h2>{product.Title}</h2>
              <p>{product.Nacimiento}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default DataElementList;   