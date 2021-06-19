import React, { useState } from 'react';
import { calculateSize } from './utils/utils';

const queries = [
    { source: "/exist/apps/monex/index.html", state: "running", waiting: 0.0, running: 0.1, killable: true, },
    { source: "/exist/apps/packageservice/package/icon?package=http://exist-db.org/apps/demo", state: "running", waiting: 0.0, running: 2.1, killable: true, },
    { source: "/exist/apps/packageservice/packages/apps", state: "waiting", waiting: 0.2, running: 0.0, killable: true, },
    { source: "/exist/apps/packageservice/package/icon", state: "done", waiting: 0.0, running: 0.2, killable: false, },
    { source: "/exist/apps/packageservice/packages/apps", state: "killed", waiting: 0.5, running: 0.0, killable: true, },
]

const KillButton = () => {
    return (
        <span className="btn flx" onClick={() => { }}>
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5103 21.6375C18.268 21.6375 22.9356 17.2341 22.9356 11.8023C22.9356 6.37042 18.268 1.96704 12.5103 1.96704C6.75261 1.96704 2.08505 6.37042 2.08505 11.8023C2.08505 17.2341 6.75261 21.6375 12.5103 21.6375Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.6379 8.85172L9.38275 14.7529" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.38275 8.85172L15.6379 14.7529" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
    );
};

const SortButton = () => {
    const [state, setState] = useState(0);

    const Sort = (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.68946 14.0625H18.3105C19.3555 14.0625 19.8779 15.3271 19.1406 16.0645L13.3301 21.875C12.8711 22.334 12.1289 22.334 11.6748 21.875L5.85938 16.0645C5.12207 15.3271 5.64453 14.0625 6.68946 14.0625ZM19.1406 8.93555L13.3301 3.125C12.8711 2.66602 12.1289 2.66602 11.6748 3.125L5.85938 8.93555C5.12207 9.67285 5.64453 10.9375 6.68946 10.9375H18.3105C19.3555 10.9375 19.8779 9.67285 19.1406 8.93555Z" fill="currentColor" />
        </svg>
    );

    const Top = (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.47071 0.5L14.2813 6.31055C15.0186 7.04785 14.4961 8.3125 13.4512 8.3125H1.83008C0.785159 8.3125 0.262698 7.04785 1 6.31055L6.81543 0.5C7.26953 0.0410156 8.01172 0.0410156 8.47071 0.5Z" fill="currentColor" />
        </svg>
    );

    const Bottom = (
        <svg width="25" height="25" viewBox="0 0 25 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4512 0.4375H1.83008C0.785159 0.4375 0.262698 1.70215 1 2.43945L6.81543 8.25C7.26953 8.70898 8.01172 8.70898 8.47071 8.25L14.2813 2.43945C15.0186 1.70215 14.4961 0.4375 13.4512 0.4375Z" fill="currentColor" />
        </svg>
    );


    const handleClick = () => {
        setState(state => {
            state += 1;
            return state % 3;
        })
    }

    return (
        <span className="btn flx" onClick={() => handleClick()}>
            {state === 0 ? Sort : state === 1 ? Top : Bottom}
        </span>
    );
}

const QueryState = (state: string) => {

    const running = (
        <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
                <path d="M24.9494 12.9171C24.9819 13.1589 24.9982 13.3739 24.9982 13.562C24.9982 13.75 24.9819 13.965 24.9494 14.2068H23.3871C23.3383 14.5292 23.2651 14.8516 23.1674 15.174L24.6076 15.6777C24.4612 16.0673 24.2659 16.4636 24.0218 16.8666L22.5572 16.3628C22.3782 16.6449 22.1585 16.9203 21.8981 17.189L22.9966 18.0958C22.6711 18.4316 22.3049 18.7338 21.8981 19.0025L20.7996 18.0958C20.4741 18.3107 20.1405 18.492 19.7988 18.6398L20.4091 19.8287C19.9208 20.0436 19.4408 20.2115 18.9688 20.3324L18.3586 19.1436C17.968 19.2242 17.5774 19.2846 17.1869 19.3249V20.6145C16.894 20.6414 16.6336 20.6548 16.4057 20.6548C16.1779 20.6548 15.9175 20.6414 15.6246 20.6145V19.3249C15.234 19.2846 14.8435 19.2242 14.4529 19.1436L13.8671 20.3324C13.3789 20.2115 12.8907 20.0436 12.4024 19.8287L13.0127 18.6398C12.671 18.492 12.3455 18.3107 12.0363 18.0958L10.9134 19.0025C10.5066 18.7338 10.1404 18.4316 9.81494 18.0958L10.9134 17.189C10.6693 16.9203 10.4496 16.6449 10.2543 16.3628L8.81411 16.8666C8.55374 16.4636 8.35032 16.0673 8.20385 15.6777L9.66848 15.174C9.55456 14.8516 9.47319 14.5292 9.42437 14.2068H7.86211C7.82956 13.965 7.81329 13.75 7.81329 13.562C7.81329 13.3739 7.82956 13.1589 7.86211 12.9171H9.42437C9.47319 12.5947 9.55456 12.2723 9.66848 11.9499L8.20385 11.4462C8.35032 11.0566 8.55374 10.6603 8.81411 10.2573L10.2543 10.7611C10.4496 10.479 10.6693 10.2036 10.9134 9.93491L9.81494 9.02815C10.1404 8.69232 10.5066 8.39006 10.9134 8.12139L12.0363 9.02815C12.3455 8.81322 12.671 8.63186 13.0127 8.4841L12.4024 7.27508C12.8907 7.07358 13.3789 6.91238 13.8671 6.79148L14.4529 7.98034C14.8435 7.88631 15.234 7.82586 15.6246 7.79899V6.50937C15.9175 6.48251 16.1779 6.46907 16.4057 6.46907C16.6336 6.46907 16.894 6.48251 17.1869 6.50937V7.79899C17.5774 7.82586 17.968 7.88631 18.3586 7.98034L18.9688 6.79148C19.4408 6.91238 19.9208 7.07358 20.4091 7.27508L19.7988 8.4841C20.1405 8.6453 20.4741 8.82665 20.7996 9.02815L21.8981 8.12139C22.3049 8.39006 22.6711 8.69232 22.9966 9.02815L21.8981 9.93491C22.1585 10.2036 22.3782 10.479 22.5572 10.7611L24.0218 10.2573C24.2659 10.6603 24.4612 11.0566 24.6076 11.4462L23.1674 11.9499C23.2651 12.2723 23.3383 12.5947 23.3871 12.9171H24.9494ZM16.4057 10.3379C15.3317 10.3379 14.4122 10.6536 13.6474 11.285C12.8825 11.9164 12.5001 12.6753 12.5001 13.562C12.5001 14.4486 12.8825 15.2076 13.6474 15.8389C14.4122 16.4703 15.3317 16.786 16.4057 16.786C17.4798 16.786 18.3993 16.4703 19.1641 15.8389C19.929 15.2076 20.3114 14.4486 20.3114 13.562C20.3114 12.6753 19.929 11.9164 19.1641 11.285C18.3993 10.6536 17.4798 10.3379 16.4057 10.3379ZM10.9134 6.02577L10.6205 6.65043C10.5717 6.73103 10.4944 6.79148 10.3886 6.83178C10.2828 6.87208 10.1811 6.87208 10.0835 6.83178L8.69206 6.36832C8.41541 6.69073 8.0818 6.9594 7.69123 7.17433L8.27708 8.32289C8.32591 8.41693 8.32591 8.50425 8.27708 8.58485C8.22826 8.66545 8.15503 8.7259 8.05739 8.7662L7.30067 9.02815C7.20303 9.06845 7.10132 9.06845 6.99554 9.02815C6.88976 8.98785 6.81246 8.9274 6.76364 8.8468L6.17779 7.69824C5.91741 7.73854 5.68144 7.75869 5.46989 7.75869C5.2746 7.75869 5.04677 7.73854 4.7864 7.69824L4.20055 8.8468C4.168 8.9274 4.09884 8.98785 3.99306 9.02815C3.88728 9.06845 3.77743 9.06845 3.66352 9.02815L2.93121 8.7662C2.81729 8.73933 2.73999 8.68224 2.69931 8.59492C2.65862 8.5076 2.65455 8.41693 2.6871 8.32289L3.27295 7.19448C2.88238 6.96611 2.54878 6.69073 2.27212 6.36832L0.880731 6.85193C0.78309 6.87879 0.68138 6.87544 0.575601 6.84185C0.469823 6.80827 0.392523 6.75118 0.343703 6.67058L0.0507777 6.04592C0.00195692 5.95188 -0.00211148 5.86121 0.0385725 5.77389C0.0792565 5.68657 0.156556 5.62948 0.270471 5.60261L1.63745 5.11901C1.58863 4.90407 1.56422 4.70929 1.56422 4.53465C1.56422 4.37345 1.58863 4.17866 1.63745 3.9503L0.246061 3.48684C0.148419 3.44654 0.0792565 3.38609 0.0385725 3.30549C-0.00211148 3.22489 -0.00617988 3.13757 0.0263673 3.04354L0.343703 2.41888C0.392523 2.33828 0.465755 2.27783 0.563396 2.23753C0.661038 2.19723 0.766816 2.19723 0.880731 2.23753L2.27212 2.70098C2.5325 2.37858 2.85797 2.10991 3.24854 1.89497L2.6871 0.74641C2.63828 0.652375 2.63421 0.565058 2.6749 0.484457C2.71558 0.403856 2.79288 0.343405 2.90679 0.303105L3.66352 0.0411518C3.76116 0.000851356 3.86287 0.000851356 3.96865 0.0411518C4.07443 0.0814523 4.15173 0.141903 4.20055 0.222504L4.76199 1.37107C5.02236 1.33077 5.25833 1.31062 5.46989 1.31062C5.68144 1.31062 5.91741 1.33077 6.17779 1.37107L6.73923 0.222504C6.78805 0.128469 6.86535 0.0646604 6.97113 0.0310767C7.07691 -0.00250701 7.17862 0.000851356 7.27626 0.0411518L8.03298 0.303105C8.1469 0.329972 8.2242 0.387064 8.26488 0.474382C8.30556 0.561699 8.3015 0.645659 8.25267 0.726259L7.69123 1.87482C8.0818 2.10319 8.41541 2.37858 8.69206 2.70098L10.059 2.21738C10.173 2.19051 10.2828 2.19387 10.3886 2.22745C10.4944 2.26103 10.5635 2.31813 10.5961 2.39873L10.9134 3.02339C10.9622 3.11742 10.9663 3.2081 10.9256 3.29541C10.8849 3.38273 10.8076 3.43982 10.6937 3.46669L9.30232 3.9503C9.35114 4.16523 9.37555 4.36002 9.37555 4.53465C9.37555 4.70929 9.35114 4.90407 9.30232 5.11901L10.6937 5.58246C10.8076 5.62276 10.8849 5.68321 10.9256 5.76382C10.9663 5.84442 10.9622 5.93173 10.9134 6.02577ZM5.48209 2.60023C4.83929 2.60023 4.28598 2.7883 3.82219 3.16444C3.35839 3.54057 3.12649 3.99731 3.12649 4.53465C3.12649 5.07199 3.35839 5.52873 3.82219 5.90487C4.28598 6.281 4.83929 6.46907 5.48209 6.46907C6.1249 6.46907 6.67413 6.281 7.1298 5.90487C7.58546 5.52873 7.81329 5.07199 7.81329 4.53465C7.81329 3.99731 7.58546 3.54057 7.1298 3.16444C6.67413 2.7883 6.1249 2.60023 5.48209 2.60023Z" fill="#CCCCCC" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="25.0207" height="20.654" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );

    const waiting = (
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.25516 1.96705V7.86819H6.26558L6.25516 7.87802L10.4253 11.8023L6.25516 15.7364L6.26558 15.7462H6.25516V21.6375H18.7655V15.7462H18.7551L18.7655 15.7364L14.5954 11.8023L18.7655 7.87802L18.7551 7.86819H18.7655V1.96705H6.25516ZM16.6804 16.2281V19.6705H8.34021V16.2281L12.5103 12.294L16.6804 16.2281ZM12.5103 11.3105L8.34021 7.37643V3.93409H16.6804V7.37643L12.5103 11.3105Z" fill="#CCCCCC" />
        </svg>
    );

    const done = (
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.38274 15.9331L5.00412 11.8023L3.54459 13.1792L9.38274 18.6869L21.8931 6.88466L20.4335 5.50773L9.38274 15.9331Z" fill="#CCCCCC" />
        </svg>
    );

    const killed = (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 0C5.5957 0 0 4.89746 0 10.9375C0 14.3604 1.80176 17.4121 4.61426 19.4189C5.08301 19.7559 5.35645 20.3027 5.27344 20.8789L4.81445 24.1113C4.74609 24.5801 5.10742 25 5.58105 25H9.375V22.2656C9.375 22.0508 9.55078 21.875 9.76562 21.875H10.5469C10.7617 21.875 10.9375 22.0508 10.9375 22.2656V25H14.0625V22.2656C14.0625 22.0508 14.2383 21.875 14.4531 21.875H15.2344C15.4492 21.875 15.625 22.0508 15.625 22.2656V25H19.4189C19.8926 25 20.2539 24.5801 20.1855 24.1113L19.7266 20.8789C19.6436 20.3076 19.9121 19.7559 20.3857 19.4189C23.1982 17.4121 25 14.3604 25 10.9375C25 4.89746 19.4043 0 12.5 0ZM7.8125 15.625C6.08887 15.625 4.6875 14.2236 4.6875 12.5C4.6875 10.7764 6.08887 9.375 7.8125 9.375C9.53613 9.375 10.9375 10.7764 10.9375 12.5C10.9375 14.2236 9.53613 15.625 7.8125 15.625ZM17.1875 15.625C15.4639 15.625 14.0625 14.2236 14.0625 12.5C14.0625 10.7764 15.4639 9.375 17.1875 9.375C18.9111 9.375 20.3125 10.7764 20.3125 12.5C20.3125 14.2236 18.9111 15.625 17.1875 15.625Z" fill="#CCCCCC" />
        </svg>
    );

    let icon: JSX.Element;

    switch (state) {
        case "running":
            icon = running;
            break;
        case "done":
            icon = done;
            break;
        case "waiting":
            icon = waiting;
            break;
        case "killed":
            icon = killed;
            break;
        default: {
            throw new Error("unknown state was passed");
        }
    };
    return (
        <>
            <span className="flx flx-left">{icon} {state}</span>
        </>
    );
};

function renderTableData() {
    return queries.map((query, index) => {
        const { source, state, waiting, running, killable } = query //destructuring
        const size = calculateSize(source);
        const maxWidth = window.innerWidth * 25 / 100;
        if(calculateSize(source).width > maxWidth ){
            console.log(`${source} is too big`);
        }
        return (
            <tr key={index}>
                <td className="source">{source}</td>
                <td>{QueryState(state)}</td>
                <td>{waiting}</td>
                <td>{running}</td>
                <td><KillButton /></td>
            </tr>
        )
    })
}

function renderTableHeader() {
    return (
        <tr>
            <th>
                <span>
                    <span>
                        Source
                    </span>
                </span>
            </th>
            <th>
                <span>
                    <span>
                        State
                    </span>
                </span>
            </th>
            <th>
                <span className="th">
                    <span>
                        Waiting (ms)
                    </span>
                    <SortButton />
                </span>
            </th>
            <th>
                <span className="th">
                    <span>
                        Running (ms)
                    </span>
                    <SortButton />
                </span>
            </th>
            <th>
                <span>
                    <span>
                        Kill Query
                    </span>
                </span>
            </th>
        </tr>
    );
}

const ActiveQueries : React.FC<{ gridArea: string }> = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
        alignSelf:"flex-start",
    }
    return (
        <div style={style}>
            <h3>Active Queries</h3>
            <table>
                <thead>
                    {renderTableHeader()}
                </thead>
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    )
}

export default ActiveQueries