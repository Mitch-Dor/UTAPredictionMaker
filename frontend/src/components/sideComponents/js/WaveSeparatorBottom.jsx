export default function WaveSeparatorBottom({ color }) {
    return (
        <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                height: '50px'
            }}
            >
            <path
                d="M0,50 C360,150 1080,-50 1440,50 L1440,100 L0,100 Z"
                fill={color}
                transform="rotate(180 720 50)"
            />
        </svg>
    )
}