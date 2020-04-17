package uk.co.zacgarby.roguelike;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input.Keys;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.glutils.ShaderProgram;

import uk.co.zacgarby.roguelike.world.Generator;
import uk.co.zacgarby.roguelike.world.Level;

public class Main extends ApplicationAdapter {
	public static Player player;
	public static Level level;
	public static int camX, camY;
	public Pixmap lightMap;
	
	public SpriteBatch batch;
	public SpriteBatch lightbatch;
	
	@Override
	public void create () {		
		final String FRAGMENT = Gdx.files.internal("shaders/shadow.frag").readString();
		final String VERTEX = Gdx.files.internal("shaders/shadow.vert").readString();
		ShaderProgram program = new ShaderProgram(VERTEX, FRAGMENT);
		
		lightbatch = new SpriteBatch(8191);
		batch = new SpriteBatch(8191, program);
		
		player = new Player("møøse");
		
		Generator gen = new Generator(500, 400, 400);
		System.out.println("Generating...");
		level = gen.generate();
		System.out.println("generated!");
		camX = 2000;
		camY = 2000;
		
		batch.setProjectionMatrix(batch.getProjectionMatrix().scale(4, 4, 1));
	}

	@Override
	public void render () {
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		
		

		update();
		
		batch.begin();
		level.draw(batch, camX, camY);
		Sidebar.draw(batch);
		batch.end();
	}
	
	private void update() {
		if (Gdx.input.isKeyPressed(Keys.LEFT)) {
			camX -= 3;
		}
		if (Gdx.input.isKeyPressed(Keys.RIGHT)) {
			camX += 3;
		}
		if (Gdx.input.isKeyPressed(Keys.UP)) {
			camY += 3;
		}
		if (Gdx.input.isKeyPressed(Keys.DOWN)) {
			camY -= 3;
		}
	}
	
	@Override
	public void dispose () {
		batch.dispose();
		Sidebar.dispose();
	}
}
