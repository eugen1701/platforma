import React from "react";
import {languages} from "../../utils/Languages";
import {GlobeIcon} from "../../svg/ClobalIcon"


export const LanguageDropdown:React.FC = () => {
    return (<div className="dropdown">
        {/*<button*/}
        {/*    className="btn btn-link dropdown-toggle"*/}
        {/*    type="button"*/}
        {/*    id="dropdownMenuButton1"*/}
        {/*    data-bs-toggle="dropdown"*/}
        {/*    aria-expanded="false"*/}
        {/*>*/}
        {/*    <GlobeIcon />*/}
        {/*</button>*/}
        {/*<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">*/}
        {/*    <li>*/}
        {/*        <span className="dropdown-item-text">{t('language')}</span>*/}
        {/*    </li>*/}
        {/*    {languages.map(({ code, name, country_code }) => (*/}
        {/*        <li key={country_code}>*/}
        {/*            <a*/}
        {/*                href="#"*/}
        {/*                className={classNames('dropdown-item', {*/}
        {/*                    disabled: currentLanguageCode === code,*/}
        {/*                })}*/}
        {/*                onClick={() => {*/}
        {/*                    i18next.changeLanguage(code)*/}
        {/*                }}*/}
        {/*            >*/}
        {/*            <span*/}
        {/*                className={`flag-icon flag-icon-${country_code} mx-2`}*/}
        {/*                style={{*/}
        {/*                    opacity: currentLanguageCode === code ? 0.5 : 1,*/}
        {/*                }}*/}
        {/*            ></span>*/}
        {/*                {name}*/}
        {/*            </a>*/}
        {/*        </li>*/}
        {/*    ))}*/}
        {/*</ul>*/}
    </div>);
}