export function Header({ text, leftNode, rightNode }: { text: string; leftNode?: React.ReactNode; rightNode?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 py-4 px-10 bg-primary-blue text-white w-full items-center">
      
      {/* Coluna da Esquerda */}
      <div className="flex justify-start">
        {leftNode && (
          <div className="hover:text-gray-300 hover:cursor-pointer">
            {leftNode}
          </div>
        )}
      </div>

      {/* Coluna do Meio */}
      <div className="flex justify-center">
        <p className="text-2xl font-bold whitespace-nowrap">{text}</p>
      </div>

      {/* Coluna da Direita */}
      <div className="flex justify-end">
        {rightNode && (
          <div className="hover:text-gray-300 hover:cursor-pointer">
            {rightNode}
          </div>
        )}
      </div>
      
    </div>
  );
}