-- CreateTable
CREATE TABLE `autores` (
    `codigo_autor` VARCHAR(6) NOT NULL,
    `nombre_autor` VARCHAR(50) NOT NULL,
    `nacionalidad` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`codigo_autor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generos` (
    `id_genero` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_genero` VARCHAR(40) NOT NULL,
    `descripcion` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_genero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `editoriales` (
    `codigo_editorial` VARCHAR(6) NOT NULL,
    `nombre_editorial` VARCHAR(30) NOT NULL,
    `contacto` VARCHAR(30) NOT NULL,
    `telefono` VARCHAR(9) NOT NULL,

    PRIMARY KEY (`codigo_editorial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `libros` (
    `codigo_libro` VARCHAR(9) NOT NULL,
    `nombre_libro` VARCHAR(50) NOT NULL,
    `existencias` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `codigo_autor` VARCHAR(6) NOT NULL,
    `codigo_editorial` VARCHAR(6) NOT NULL,
    `id_genero` INTEGER NOT NULL,
    `descripcion` TEXT NOT NULL,

    PRIMARY KEY (`codigo_libro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `libros` ADD CONSTRAINT `libros_codigo_autor_fkey` FOREIGN KEY (`codigo_autor`) REFERENCES `autores`(`codigo_autor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `libros` ADD CONSTRAINT `libros_codigo_editorial_fkey` FOREIGN KEY (`codigo_editorial`) REFERENCES `editoriales`(`codigo_editorial`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `libros` ADD CONSTRAINT `libros_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `generos`(`id_genero`) ON DELETE RESTRICT ON UPDATE CASCADE;
