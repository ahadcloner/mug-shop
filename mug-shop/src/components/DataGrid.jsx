import React, {useState} from "react";
import '../assets/styles/DataGrid.css';
import card from "./Card";

function DataGrid({
                      grid_title,
                      have_action,
                      action_title,
                      action_function,
                      action_function_argument,
                      headers,
                      data,
                      reload,
                      field_names,
                      buttons,
                      additional_id_setter
                  }) {

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
        <>
            {

                <div className={'grid-container card-mode'}>
                    <div className="grid-top">
                        <div className="grid-title">
                            <span>{grid_title}</span>
                        </div>
                        {
                            have_action &&
                            <div className="grid-action">
                                <button
                                    onClick={() => action_function !== '' ? action_function(action_function_argument !== '' ? action_function_argument : '') : () => {
                                    }}>{action_title}</button>
                            </div>
                        }
                    </div>
                    <div className="grid-bottom">
                        <div className="grid-card-container">
                            {
                                mydata.map((d, index) => {
                                    return (
                                        <div className={'grid-card'}>
                                            <div className="grid-card-row">
                                                {
                                                    headers.map((h, hindex) => {

                                                        return (
                                                            <div key={hindex} className={'grid-card-row-child'}>
                                                                <span>{h.title}</span>
                                                                {hindex === 0 && <span>{index + 1}</span>}
                                                                {hindex === headers.length - 1 && <span></span>}
                                                                {
                                                                    hindex > 0 && hindex < headers.length - 1 &&
                                                                    field_names[hindex - 1].is_date &&
                                                                    <span>{format_date(d[field_names[hindex - 1].title])}</span>

                                                                }
                                                                {
                                                                    hindex > 0 && hindex < headers.length - 1 &&
                                                                    !field_names[hindex - 1].is_date &&
                                                                    !field_names[hindex - 1].is_image &&
                                                                    !field_names[hindex - 1].is_boolean &&
                                                                    field_names[hindex - 1].title.split('.').length === 2 &&
                                                                    <span>{d?.[field_names?.[hindex - 1]?.title?.split('.')?.[0]?.toString()]?.[field_names?.[hindex - 1]?.title?.split('.')?.[1]?.toString()]}</span>
                                                                }
                                                                {
                                                                    hindex > 0 && hindex < headers.length - 1 &&  field_names[hindex - 1]?.title &&
                                                                    !field_names[hindex - 1].is_date &&
                                                                    !field_names[hindex - 1].is_image &&
                                                                    !field_names[hindex - 1].is_boolean &&
                                                                    field_names[hindex - 1]?.title?.split('.')?.length === 3 &&
                                                                    <span>{d?.[field_names?.[hindex - 1]?.title?.split('.')?.[0]?.toString()]?.[field_names?.[hindex - 1]?.title?.split('.')?.[1]?.toString()]?.[field_names?.[hindex - 1]?.title?.split('.')?.[2]?.toString()]}</span>
                                                                }
                                                                {
                                                                    hindex > 0 && hindex < headers.length - 1 &&
                                                                    !field_names[hindex - 1].is_date &&
                                                                    !field_names[hindex - 1].is_image &&
                                                                    field_names[hindex - 1].is_boolean &&
                                                                    <span className={`${d[field_names[hindex -1].title] === '1' ? 'account-active' : 'account-not-active'}`}>
                                                                        {
                                                                            d[field_names[hindex -1].title] === '1'?'فعال':'غیر فعال'
                                                                        }
                                                                    </span>
                                                                }
                                                                {
                                                                    hindex > 0 && hindex < headers.length - 1 &&
                                                                    !field_names[hindex - 1].is_date &&
                                                                    field_names[hindex - 1].is_image &&
                                                                    !field_names[hindex - 1].is_boolean &&
                                                                    // <span className={'span-img'}>
                                                                        <img className={'card-img'} src={'https://hitmug.ir/api.hitmug.ir/public/' + d[field_names[hindex -1].title]} alt={'site banner'}/>
                                                                    // </span>
                                                                //
                                                                }
                                                                {
                                                                            hindex > 0 && hindex < headers.length - 1 &&
                                                                            !field_names[hindex - 1].is_date &&
                                                                            !field_names[hindex - 1].is_image &&
                                                                            !field_names[hindex - 1].is_boolean &&
                                                                            field_names[hindex - 1].title.split('.').length === 1 &&
                                                                            <span>{d[field_names[hindex -1].title]}</span>
                                                                }


                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                            <div className={'grid-card-actions'}>
                                                {
                                                    buttons.map((b,bindex) => {
                                                        return < button onClick={
                                                            b.func !== '' ? () => {
                                                                b.func(d.id);
                                                                if (additional_id_setter !== '') {
                                                                    additional_id_setter(d.id);
                                                                }
                                                            } : () => {
                                                            }} key={b.id}>{b.title}</button>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            {

                <div className={'grid-container grid-mode'}>
                    <div className="grid-top">
                        <div className="grid-title">
                            <span>{grid_title}</span>
                        </div>
                        {
                            have_action &&
                            <div className="grid-action">
                                <button
                                    onClick={() => action_function !== '' ? action_function(action_function_argument !== '' ? action_function_argument : '') : () => {
                                    }}>{action_title}</button>
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

                                        <tr  className={'table-data'} key={d.id}>

                                            <td>{index + 1}</td>
                                            {

                                                field_names.map((f) => {

                                                    if (f.is_date) {

                                                        return <td key={f.id}>{format_date(d[f.title])}</td>
                                                    }
                                                    if (!f.is_date) {
                                                        let test = f.title.split('.');
                                                        if (test.length === 2 && d[test[0].toString()]) {
                                                            return <td
                                                                key={f.id}>{d[test[0].toString()][test[1].toString()]}</td>
                                                        } else if (test.length === 3 && d[test[0].toString()] && d[test[0].toString()][test[1].toString()]) {
                                                            return <td
                                                                key={f.id}>{d[test[0].toString()][test[1].toString()][test[2].toString()]}</td>
                                                        } else {
                                                            if (f.is_boolean) {
                                                                return <td
                                                                    className={`${d[f.title] === '1' ? 'account-active' : 'account-not-active'}`}
                                                                    key={f.id}>{d[f.title] === '1' ? 'فعال' : 'غیر فعال'}</td>
                                                            } else {
                                                                if (f.is_image) {
                                                                    return <td key={f.id}><img
                                                                        src={'https://hitmug.ir/api.hitmug.ir/public/' + d[f.title]}
                                                                        alt={'site banner'}/></td>
                                                                } else {
                                                                    return <td key={f.id}>{d[f.title]}</td>
                                                                }
                                                            }
                                                        }

                                                    }

                                                })
                                            }
                                            <td>
                                                {
                                                    buttons.map((b) => {
                                                        return <button key={b?.id} onClick={
                                                            b.func !== '' ? () => {
                                                                b.func(d.id);
                                                                if (additional_id_setter !== '') {
                                                                    additional_id_setter(d.id);
                                                                }
                                                            } : () => {
                                                            }} key={b.id}>{b.title}</button>
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
            }
        </>
    )
}

export default DataGrid;