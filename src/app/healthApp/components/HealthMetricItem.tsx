import pascalCase from 'pascalcase';

export default function HealthMetricItem({ prop, items }) {
  return (
    <div key={prop}>
      <span
        style={{
          width: 50,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'inline-block',
        }}
      >
        {`${pascalCase(prop)}:  ${items[prop]}`}
      </span>
    </div>
  );
}
