import React from "react";
import '../assets/styles/DataGrid.css';

function DataGrid({grid_title, have_action, action_title, headers, data, reload, field_names, buttons}) {

    const mydata = [...data];

    const format_date = (sample) => {
        if (sample !== null) {
            let mysample = sample.toString()
                .split("T")[0].toString().replaceAll('-', '/')
            ;
            return mysample;

        }
        return '';

    }
    return (
        <div className={'grid-container'}>
            <div className="grid-top">
                <div className="grid-title">
                    <span>{grid_title}</span>
                </div>
                {
                    have_action &&
                    <div className="grid-action">
                        <button>{action_title}</button>
                    </div>
                }
            </div>
            <div className="grid-bottom">
                <table className={'dg-table'}>
                    <tr className={'header'}>
                        {
                            headers.map((h) =>
                                <th key={h.id}>{h.title}</th>
                            )
                        }
                    </tr>
                    {
                        mydata.map((d, index) => {

                            return (
                                <tr className={'table-data'} key={d.id}>

                                    <td>{index + 1}</td>
                                    {
                                        field_names.map((f) => {

                                                if(f.is_date){

                                                    return <td key={f.id}>{format_date(d[f.title])}</td>
                                                }
                                                if(! f.is_date){
                                                    let test = f.title.split('.');
                                                    if(test.length===2 && d[test[0].toString()] )
                                                    {
                                                        return  <td key={f.id}>{d[test[0].toString()][test[1].toString()]}</td>
                                                    }
                                                    else if(test.length===3 && d[test[0].toString()] && d[test[0].toString()][test[1].toString()])
                                                    {
                                                        return  <td key={f.id}>{d[test[0].toString()][test[1].toString()][test[2].toString()]}</td>
                                                    }
                                                    else
                                                    {
                                                        if (f.is_boolean)
                                                        {
                                                            return <td className={`${d[f.title]==='1'?'account-active':'account-not-active'}`} key={f.id}>{d[f.title]==='1'?'فعال':'غیر فعال'}</td>
                                                        }
                                                        else
                                                        {
                                                            return  <td key={f.id}>{d[f.title]}</td>
                                                        }
                                                    }

                                                }

                                        })
                                    }
                                    <td>
                                        {
                                            buttons.map((b) => {
                                                return <button onClick={b.func !=='' ?()=>{ b.func(d.id)}:()=>{}} key={b.id}>{b.title}</button>
                                            })
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default DataGrid;