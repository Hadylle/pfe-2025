export default function PhotoComponent({ photo, name = "User" }) {
  if (!photo) {
    return (
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100 flex items-center justify-center">
        <span className="text-5xl md:text-6xl">
          {name.split(' ').map(n => n[0]).join('').toUpperCase() || '👤'}
        </span>
      </div>
    );
  }

  return (
    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600">
      <img 
        src={photo} 
        alt={`${name}'s profile`} 
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '';
          // This will make it fall back to the initials version
        }}
      />
    </div>
  );
}