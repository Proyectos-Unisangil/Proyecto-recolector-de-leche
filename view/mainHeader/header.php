<?php 

    require_once("../../config/connection.php");

?>

<header class="site-header fondo_header">
			<div class="container-fluid">

				<a href="#" class="site-logo"> 
					<img class="hidden-md-down" src="../../public/img/folder.png" alt=""> 
					<img class="hidden-lg-up" src="../../public/img/folder.png" alt="">
				</a>

				<button id="show-hide-sidebar-toggle " class="show-hide-sidebar color_boton">
					<span>toggle menu</span>
				</button>

				<button class="hamburger hamburger--htla color_boton">
					<span>toggle menu</span>
				</button>
				
				<div class="site-header-content ">
					<div class="site-header-content-in ">
						<div class="site-header-shown ">
							<div class="dropdown user-menu ">
								<button class="dropdown-toggle color_boton" id="dd-user-menu" type="button" data-toggle="dropdown" aria-haspopup="true">
									<img src="../../public/img/avatar-1-128.png" alt="">
								</button>
								<div class="dropdown-menu dropdown-menu-right " aria-labelledby="dd-user-menu">
									<a class="dropdown-item" href="../MntPerfil/"><span class="font-icon glyphicon glyphicon-user"></span>Perfil</a>
									<a class="dropdown-item" href="#"><span class="font-icon glyphicon glyphicon-question-sign"></span>Ayuda</a>
									<div class="dropdown-divider"></div>
									<a class="dropdown-item" href="../logout/logout.php"><span class="font-icon glyphicon glyphicon-log-out"></span>Cerrar Sesión</a>
								</div>
							</div>
						</div>
						<!--.site-header-shown-->

						<div class="mobile-menu-right-overlay"></div>
						
						<input type="hidden" id="user_idx" value="<?php echo $_SESSION['id_usuario']; ?>"> <!-- ID del usuario  -->
						<input type="hidden" id="rol_idx" value="<?php echo $_SESSION['rol_id']; ?>"> <!-- ID del rol del usuario  -->
						
						<div class="dropdown dropdown-typical">
							<a href="#" class="dropdown-toggle no-arr ">
								<span class="font-icon font-icon-user"></span>
								<span class="lblcontactonomx"><?php echo $_SESSION['nombre_usuario'].' '.$_SESSION['apellido_usuario'].' ('.$_SESSION['documento'].')' ?></span>
							</a>
						</div>
						<!--.site-header-collapsed-->
					</div>
					<!--site-header-content-in-->
				</div>
				<!--.site-header-content-->
			</div>
			<!--.container-fluid-->
		</header>
