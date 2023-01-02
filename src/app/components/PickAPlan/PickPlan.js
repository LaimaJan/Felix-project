import './PickAPlan.css';

function PickAPlan({
	title,
	monthlyCost,
	totalCost,
	frequencyUnit,
	frequencyInterval,
}) {
	return (
		<div className="cards-content">
			<input type="checkbox" name="checkbox" />
			<div className="plan-wrapper">
				<div className="plan-name">
					<p>{title}</p>
				</div>
				<div className="plan-cost-per-month">
					<p>{monthlyCost} $</p>
					<p>per month</p>
				</div>
				<div className="plan-sale-percentage">
					<p>off</p>
				</div>
				<div className="plan-whole-cost">
					<p className="cost-strike">95.88</p>
					<p className="cost-after-sale">
						{totalCost} billed every {frequencyInterval} {frequencyUnit}
					</p>
				</div>
			</div>
		</div>
	);
}

export default PickAPlan;
