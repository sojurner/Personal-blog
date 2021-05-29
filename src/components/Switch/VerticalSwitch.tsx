import React from "react"

import Icon from "@components/Icon"
import Typography from '@components/Typography'
import "./_customSwitch.scss"

const VerticalSwitch = (props) => {
	return (
		<label className="switch--vertical">
			<input type="checkbox" id="toggle" className="switch--vertical__input" {...props} />
			<Typography variant="neutralBlank">
				<Icon className="switch--vertical__icon" svg={!props.checked ? "sortDescending" : "sortAscending"} />
			</Typography>
		</label>
	)
}

export { VerticalSwitch as default }
